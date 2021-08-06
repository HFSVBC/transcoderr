module Sonarr
  class LoadSeries
    def initialize(params)
      @connection = params.fetch(:connection)
    end

    def call
      return unless @connection.sonarr?

      client.series.each do |serie|
        sync_serie(serie)
      end
    end

    private

    def sync_serie(media)
      serie = ::Serie.find_or_initialize_by(sonarr_id: media["id"])
      serie.name = media["title"]
      serie.file_location = media["path"]
      serie.profile = profile
      serie.poster = poster(media["images"])
      serie.save!

      serie
    end

    def poster(images)
      return unless images.present?

      image = images.find { |image| image["coverType"] == "poster" }
      image&.[]("remoteUrl")
    end

    def profile
      @profile ||= Profile.find_by(default: true) || Profile.find_by(name: "h265")
    end

    def client
      @client ||= Sonarr::Client.new(
        api_endpoint: @connection.host,
        api_port: @connection.port,
        api_token: @connection.api_key,
        ssl: @connection.ssl,
      )
    end
  end
end

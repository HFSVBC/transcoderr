module Radarr
  class LoadMovies
    def initialize(params)
      @connection = params.fetch(:connection)
    end

    def call
      return unless @connection.radarr?

      client.movies.each do |media|
        movie = sync_movie(media)
        update_metadata(movie)
      end
    end

    private

    def sync_movie(media)
      return unless media["movieFile"].present?

      movie = ::Movie.find_or_initialize_by(radarr_id: media["id"])
      movie.name = media["title"]
      movie.file_location = media["movieFile"]["path"]
      movie.profile = profile
      movie.poster = poster(media["images"])
      movie.save!

      movie
    end

    def update_metadata(media)
      return unless media.present?

      service = UpdateMediaMetadata.new(media: media)
      service.call
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
      @client ||= Radarr::Client.new(
        api_endpoint: @connection.host,
        api_port: @connection.port,
        api_token: @connection.api_key,
        ssl: @connection.ssl,
      )
    end
  end
end

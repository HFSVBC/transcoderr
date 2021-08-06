module Sonarr
  class GetSerie
    def initialize(params)
      @serie = params.fetch(:serie)
      @connection = params.fetch(:connection)
    end

    def call
      sonarr_serie = client.serie(@serie.sonarr_id)
      Sonarr::Serie.new(
        overview: sonarr_serie["overview"],
        fanart: fanart(sonarr_serie["images"]),
      )
    end

    private

    def fanart(images)
      image = images.find { |image| image["coverType"] == "fanart" }
      image&.[]("remoteUrl")
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

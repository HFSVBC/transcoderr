module Radarr
  class GetMovie
    def initialize(params)
      @movie = params.fetch(:movie)
      @connection = params.fetch(:connection)
    end

    def call
      radarr_movie = client.movie(@movie.radarr_id)
      Radarr::Movie.new(
        overview: radarr_movie["overview"],
        fanart: fanart(radarr_movie["images"]),
      )
    end

    private

    def fanart(images)
      image = images.find { |image| image["coverType"] == "fanart" }
      image&.[]("remoteUrl")
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

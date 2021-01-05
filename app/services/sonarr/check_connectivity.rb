require "faraday/error"

module Sonarr
  class CheckConnectivity
    def initialize(params)
      @connection = params.fetch(:connection)
    end

    def call
      return unless @connection.sonarr?

      provider_status.present?
    end

    private

    def provider_status
      client.system_status()
    rescue Faraday::Error
      {}
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

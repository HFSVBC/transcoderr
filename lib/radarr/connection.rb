module Radarr
  module Connection
    private

    def connection
      @connection ||=
        Faraday.new(api_endpoint) do |conn|
          conn.headers["X-Api-Key"] = api_token
          conn.ssl.verify = verify_ssl
          conn.use Faraday::Response::RaiseError
          conn.adapter Faraday.default_adapter
        end
    end
  end
end

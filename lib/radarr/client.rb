require "radarr/connection"
require "radarr/request"
require "radarr/client/movies"
require "radarr/client/system_status"

module Radarr
  class Client
    include Radarr::Connection
    include Radarr::Request
    include Radarr::Client::Movies
    include Radarr::Client::SystemStatus

    DEFAULT_PAGE_SIZE = 500

    attr_reader :api_endpoint, :api_token, :verify_ssl, :page_size

    def initialize(options)
      @api_endpoint = endpoint(options)
      @api_token = options[:api_token]
      @verify_ssl = options[:verify_ssl] || true
      @page_size = options[:page_size] || DEFAULT_PAGE_SIZE
    end

    private

    def endpoint(options)
      "http#{options[:ssl] ? 's' : ''}://#{options[:api_endpoint]}:#{options[:api_port]}/api/v3"
    end
  end
end

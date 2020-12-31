require "sonarr/connection"
require "sonarr/request"
require "sonarr/client/system_status"

module Sonarr
  class Client
    include Sonarr::Connection
    include Sonarr::Request
    include Sonarr::Client::SystemStatus

    DEFAULT_PAGE_SIZE = 500

    attr_reader :api_endpoint, :api_token, :verify_ssl, :page_size

    def initialize(options = {})
      @api_endpoint = "http#{options[:ssl] ? "s": ""}://#{options[:api_endpoint]}:#{options[:api_port]}/api"
      @api_token = options[:api_token]
      @verify_ssl = options[:verify_ssl] || true
      @page_size = options[:page_size] || DEFAULT_PAGE_SIZE
    end
  end
end

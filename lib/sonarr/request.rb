module Sonarr
  module Request
    def get(path, options = {})
      request(:get, path, options)
    end

    private

    def request(method, path, options)
      @last_response =
        response = connection.send(method) do |request|
          request.url(path, options)
        end

      JSON.parse(response.body) if response.body.present?
    end
  end
end

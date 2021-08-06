module Sonarr
  class Client
    module Series
      def series
        get("series")
      end

      def serie(id)
        get("series/#{id}")
      end
    end
  end
end

module Radarr
  class Client
    module Movies
      def movies
        get("movie")
      end

      def movie(id)
        get("movie/#{id}")
      end
    end
  end
end

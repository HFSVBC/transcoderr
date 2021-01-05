module API
  module V1
    class MoviesController < APIController
      before_action :set_movie, only: %i[show]

      def index
        @pagy, movies = pagy(Movie.all.order(:name))

        render json: API::MoviesSerializer.render(movies)
      end

      def show
        render json: API::MovieSerializer.render(@movie)
      end

      private

      def set_movie
        @movie = Movie.find(params[:id])
      end
    end
  end
end

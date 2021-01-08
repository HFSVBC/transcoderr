module API
  module V1
    class MoviesController < APIController
      before_action :set_movie, only: %i[show transcode]

      def index
        @pagy, movies = pagy(Movie.all.order(:name))

        render json: API::MoviesSerializer.render(movies)
      end

      def show
        render json: API::MovieSerializer.render(@movie)
      end

      def transcode
        TranscodeMediaJob.perform_async(@movie.id)

        render json: { message: "Transcoding job enqueued" }, status: :created
      end

      private

      def set_movie
        @movie = Movie.find(params[:id])
      end
    end
  end
end

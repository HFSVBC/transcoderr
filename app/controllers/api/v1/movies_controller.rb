module API
  module V1
    class MoviesController < APIController
      before_action :set_movie, only: %i[show update transcode]

      def index
        @pagy, movies = pagy(Movie.all.order(:name))

        render json: API::MoviesSerializer.render(movies)
      end

      def show
        render json: API::MovieSerializer.render(@movie)
      end

      def update
        @movie.update(movie_params)

        if @movie.valid?
          render json: API::MovieSerializer.render(@movie), status: :ok
        else
          render json: { message: @movie.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def transcode
        TranscodeMediaJob.perform_async(@movie.id)

        render json: { message: "Transcoding job enqueued" }, status: :created
      end

      private

      def set_movie
        @movie = Movie.find(params[:id])
      end

      def movie_params
        params.require(:movie).permit(
          :profile_id
        )
      end
    end
  end
end

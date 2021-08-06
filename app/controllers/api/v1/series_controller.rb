module API
  module V1
    class SeriesController < APIController
      before_action :set_serie, only: %i[show update destroy transcode]

      def index
        @pagy, series = pagy(Serie.all.order(:name))

        render json: API::SeriesSerializer.render(series)
      end

      def show
        render json: API::SerieSerializer.render(@serie)
      end

      def update
        @serie.update(serie_params)

        if @serie.valid?
          render json: API::SerieSerializer.render(@serie), status: :ok
        else
          render json: { message: @serie.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @serie.destroy
          render json: { message: "Movie successfully destroyed." }, status: :ok
        else
          render json: { message: @serie.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def transcode
        TranscodeMediaJob.perform_async(@serie.id)

        render json: { message: "Transcoding job enqueued" }, status: :created
      end

      private

      def set_serie
        @serie = Serie.find(params[:id])
      end

      def serie_params
        params.require(:serie).permit(
          :profile_id
        )
      end
    end
  end
end

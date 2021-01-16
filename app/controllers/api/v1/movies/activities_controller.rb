module API
  module V1
    module Movies
      class ActivitiesController < APIController
        before_action :set_movie
        
        def index
          @pagy, activities = pagy(@movie.activities.order(:created_at, :desc))

          render json: API::ActivitiesSerializer.render(activities)
        end

        private
        
        def set_movie
          @movie = Movie.find(params[:movie_id])
        end
      end
    end
  end
end

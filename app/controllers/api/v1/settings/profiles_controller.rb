module API
  module V1
    module Settings
      class ProfilesController < APIController
        before_action :set_profile, only: %i[destroy show update]

        def index
          @pagy, profiles = pagy(Profile.all)

          render json: API::ProfileSerializer.render(profiles)
        end

        def show
          render json: API::ProfileSerializer.render(@profile)
        end

        def create
          profile = Profile.new(profile_params)

          if profile.save
            render json: API::ProfileSerializer.render(profile), status: :created
          else
            render json: { message: profile.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          @profile.update(profile_params)

          if @profile.valid?
            render json: API::ProfileSerializer.render(@profile), status: :ok
          else
            render json: { message: @profile.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          if @profile.destroy
            render json: { message: "Profile successfully destroyed." }, status: :ok
          else
            render json: { message: @profile.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def set_profile
          @profile = Profile.find(params[:id])
        end

        def profile_params
          params.require(:profile).permit(
            :name,
            config: {},
            transcoder_config: {},
          )
        end
      end
    end
  end
end

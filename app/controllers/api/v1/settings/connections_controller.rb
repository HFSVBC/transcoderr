module API
  module V1
    module Settings
      class ConnectionsController < APIController
        before_action :set_connection, only: %i[destroy show update]

        def index
          @pagy, connections = pagy(Connection.all)

          render json: API::ConnectionSerializer.render(connections)
        end

        def show
          render json: API::ConnectionSerializer.render(@connection)
        end

        def create
          connection = Connection.new(connection_params)

          if connection.save
            render json: API::ConnectionSerializer.render(connection), status: :created
          else
            render json: { message: @connection.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          @connection.update(connection_params)

          if @connection.valid?
            render json: API::ConnectionSerializer.render(@connection), status: :ok
          else
            render json: { message: @connection.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          if @connection.destroy
            render json: { message: "Connection successfully destroyed." }, status: :ok
          else
            render json: { message: @connection.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def set_connection
          @connection = Connection.find(params[:id])
        end

        def connection_params
          params.require(:connection).permit(
            :name,
            :provider,
            :host,
            :port,
            :api_key,
            :ssl,
          )
        end
      end
    end
  end
end

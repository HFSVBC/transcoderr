class CheckConnectionConnectivity
  def initialize(params)
    @connection = params.fetch(:connection)
  end

  def call
    service =
      case @connection.provider
      when Connection::SONARR
        Sonarr::CheckConnectivity.new(connection: @connection)
      when Connection::RADARR
        Radarr::CheckConnectivity.new(connection: @connection)
      else
        false
      end
    service.call
  end
end

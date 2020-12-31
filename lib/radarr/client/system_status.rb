module Radarr
  class Client
    module SystemStatus
      def system_status
        get("system/status")
      end
    end
  end
end

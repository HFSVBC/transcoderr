module Sonarr
  class Client
    module SystemStatus
      def system_status
        get("system/status")
      end
    end
  end
end

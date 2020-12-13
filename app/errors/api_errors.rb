module APIErrors
  class StandardError < StandardError
    attr_reader :message, :status

    def initialize(message: nil, status: nil)
      @message = message
      @status = status
    end

    def as_json
      {
        message: message,
      }
    end
  end

  class UnauthorizedError < StandardError
    attr_reader :message, :status

    def initialize(message: nil, status: nil)
      @message = message
      @status = status
    end

    def as_json
      {
        message: message,
      }
    end
  end
end

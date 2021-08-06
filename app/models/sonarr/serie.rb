module Sonarr
  class Serie
    attr_accessor :overview, :fanart

    def initialize(params)
      @overview = params[:overview]
      @fanart = params[:fanart]
    end
  end
end

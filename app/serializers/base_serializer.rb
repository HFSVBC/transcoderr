class BaseSerializer < Blueprinter::Base
  ##
  # Sets resource class name as root by default.
  #
  def self.render(resource, options = {})
    unless options.key?(:root)
      options[:root] = "data"
    end

    super(resource, options)
  end
end

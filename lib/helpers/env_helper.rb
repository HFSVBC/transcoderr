module ENVHelper
  module_function

  TRUE_VALUES = %w[1 true].freeze
  FALSE_VALUES = %w[0 false].freeze

  def boolean(value)
    return unless value.present?

    case value.downcase
    when *TRUE_VALUES then true
    when *FALSE_VALUES then false
    end
  end
end

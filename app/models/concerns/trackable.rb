module Trackable
  extend ActiveSupport::Concern

  included do
    has_many :activities, as: :trackable
  end

  def create_activity(action, metadata = {})
    metadata.merge!(changes: previous_changes)
    activities.create!(action: action, metadata: metadata)
  end
end

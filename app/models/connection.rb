class Connection < ApplicationRecord
  PROVIDERS = %w[sonarr radarr].freeze

  validates :name, presence: true, uniqueness: true
  validates :provider, presence: true, inclusion: { in: PROVIDERS }
  validates :host, presence: true
  validates :port, presence: true
  validates :api_key, presence: true
end

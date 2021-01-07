class Connection < ApplicationRecord
  RADARR = "radarr".freeze
  SONARR = "sonarr".freeze
  PROVIDERS = [SONARR, RADARR].freeze

  validates :name, presence: true, uniqueness: true
  validates :provider, presence: true, inclusion: { in: PROVIDERS }, uniqueness: true
  validates :host, presence: true
  validates :port, presence: true
  validates :api_key, presence: true

  scope :radarr, -> { where(provider: RADARR).try(:first) }
  scope :sonarr, -> { where(provider: SONARR).try(:first) }

  def radarr?
    provider.eql?(RADARR)
  end

  def sonarr?
    provider.eql?(SONARR)
  end
end

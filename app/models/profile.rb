class Profile < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :config, presence: true

  def config
    read_attribute(:config).symbolize_keys
  end
end

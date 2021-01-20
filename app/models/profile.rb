class Profile < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :config, presence: true
  validates :default, uniqueness: true, if: :default_profile?

  def config
    read_attribute(:config).symbolize_keys
  end
  
  private
  
  def default_profile?
    default?
  end
end

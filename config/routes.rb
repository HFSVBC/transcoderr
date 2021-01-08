require "sidekiq/web"
require "sidekiq-scheduler/web"
require "sidekiq-status/web"

Rails.application.routes.draw do
  mount Sidekiq::Web, at: "/sidekiq", as: :sidekiq

  namespace :api do
    namespace :v1 do
      resources :movies do
        member do
          patch :transcode
        end
      end

      namespace :settings do
        resources :connections
        resources :profiles

        post "connections/test" => "connections#test", :as => "test_connection"
      end
    end
  end

  root to: "pages#application"

  get "*path", to: "pages#application" # NOTE This must come in last.
end

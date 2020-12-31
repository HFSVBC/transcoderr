Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :settings do
        resources :connections

        post "connections/test" => "connections#test", :as => "test_connection"
      end
    end
  end

  root to: "pages#application"

  get "*path", to: "pages#application" # NOTE This must come in last.
end

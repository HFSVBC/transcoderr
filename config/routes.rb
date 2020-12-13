Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :settings do
        resources :connections, only: %i[index show create update destroy]
      end
    end
  end

  root to: "pages#application"

  get "*path", to: "pages#application" # NOTE This must come in last.
end

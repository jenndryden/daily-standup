Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'standup_characters/index'
      post 'standup_characters/create'
      get '/show/:id', to: 'standup_characters#show'
      delete '/destroy/:id', to: 'standup_characters#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  root 'lists#index'

  resources :items

  put 'check_item', to:  'items#check_item'

end

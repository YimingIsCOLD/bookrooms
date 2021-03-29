# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  devise_for :users, skip: %i[sessions registrations passwords]
  devise_scope :user do
    # Sessions.
    get 'login', to: 'devise/sessions#new', as: 'new_user_session'
    post 'login', to: 'devise/sessions#create', as: 'user_session'
    post 'logout', to: 'devise/sessions#destroy', as: 'destroy_user_session'

    # Registrations.
    get 'register', to: 'devise/registrations#new', as: 'new_user_registration'
    post 'register', to: 'devise/registrations#create', as: 'user_registration'
    get 'account/edit', to: 'devise/registrations#edit', as: 'edit_user_registration'
    post 'account/edit', to: 'devise/registrations#update'

    # Passwords.
    get 'forgot', to: 'devise/passwords#new', as: 'new_user_password'
    post 'forgot', to: 'devise/passwords#create'
    get 'reset', to: 'devise/passwords#edit', as: 'edit_user_password'
    post 'reset', to: 'devise/passwords#update', as: 'user_password'
  end

  scope '/api' do
    get 'bookings', to: 'bookings#index'
    post 'bookings', to: 'bookings#create'
    delete 'bookings/:id', to: 'bookings#delete'

    get 'search', to: 'search#index'
  end

  root to: 'dashboard#index'
  get '*any_route', to: 'dashboard#index'
end

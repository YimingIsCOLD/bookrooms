# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { generate(:email) }
    name { generate(:name) }
    password { '12345678' }
  end
end

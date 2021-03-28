# frozen_string_literal: true

FactoryBot.define do
  factory :room do
    name { generate(:room_name) }
    description { Faker::Lorem.sentences }
    seats { 3 }
  end
end

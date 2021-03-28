# frozen_string_literal: true

FactoryBot.define do
  sequence(:email) { |n| "user#{n}@example.org" }
  sequence(:name) { |n| "John Doe#{n}" }
  sequence(:room_name) { |n| "Room #{n}" }
end

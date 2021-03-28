# frozen_string_literal: true

FactoryBot.define do
  factory :booking do
    user_id { 1 }
    room_id { 1 }
    date { '2021-03-21' }
    start_time { '09:00' }
    end_time { '09:30' }
  end
end

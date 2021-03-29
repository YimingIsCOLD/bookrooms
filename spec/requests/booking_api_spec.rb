# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Bookings API', type: :request do
  let(:user) { create(:user) }

  before do
    sign_in(user)
  end

  it 'returns all bookings' do
    booked_room = create(:room)
    create(:booking, user_id: user.id, room_id: booked_room.id, date: DateTime.now)

    get '/api/bookings'

    expect(response).to have_http_status(:ok)
    json_response = JSON.parse(response.body)
    expect(json_response).to be_an Array
    expect(json_response.length).to eq(1)
    expect(json_response[0]['room']['name']).to eq(booked_room.name)
  end

  it 'be able to create booking' do
    available_room = create(:room)

    params = { date: '2021-03-21', start_time: '09:00', end_time: '09:30', room_id: available_room.id }
    post '/api/bookings', params: params, as: :json

    expect(response).to have_http_status(:no_content)
  end

  it 'be able to delete booking' do
    booked_room = create(:room)
    booking = create(:booking, user_id: user.id, room_id: booked_room.id, date: DateTime.now)

    delete "/api/bookings/#{booking.id}"

    expect(response).to have_http_status(:no_content)
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Search API', type: :request do
  let(:user) { create(:user) }

  before do
    sign_in(user)
  end

  it 'should return all rooms' do
    available_room = create(:room)

    params = { date: '2021-03-21', start_time: '09:00', end_time: '09:30', seats: 3 }
    get '/api/search', params: params, as: :json

    expect(response).to have_http_status(:ok)
    json_response = JSON.parse(response.body)
    expect(json_response).to be_an Array
    expect(json_response.length).to be(1)
    expect(json_response[0]['name']).to be == available_room.name
  end

  it 'should not return booked rooms' do
    available_room = create(:room)
    booked_room = create(:room)
    create(:booking, user_id: user.id, room_id: booked_room.id, date: '2021-03-21')

    params = { date: '2021-03-21', start_time: '09:00', end_time: '09:30', seats: 3 }
    get '/api/search', params: params, as: :json

    expect(response).to have_http_status(:ok)
    json_response = JSON.parse(response.body)
    expect(json_response).to be_an Array
    expect(json_response.length).to be(1)
    expect(json_response[0]['name']).to be == available_room.name
  end
end

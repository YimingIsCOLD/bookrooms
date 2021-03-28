# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Room, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:bookings).dependent(:destroy) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(255) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:seats) }
  end
end

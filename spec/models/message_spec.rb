require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      it "is valid with a content" do
        expect(build(:message, image: nil)).to be_valid
      end

      it "is valid with an image" do
        message = 
        expect(build(:message, content: nil)).to be_valid
      end

      it "is valid with both a content and an image" do
        message = 
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without both a content and an image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it "is invalid without group_id" do
        message = build(:message, group: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "is invalid without user_id" do
        message = build(:message, user: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
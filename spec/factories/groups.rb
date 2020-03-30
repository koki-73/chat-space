FactoryBot.define do

  factory :group do
    name {Faker::Movies::StarWars.character}
  end

end
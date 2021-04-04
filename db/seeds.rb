9.times do |i|
  StandupCharacter.create(
    name: "Character #{i + 1}",
    descriptions: 'Fiesty but sweet, this character loves when the stand-up stays on time. But be careful, if the stand-up goes over time, this character may become cranky.',
    instruction: 'Click the start button to select this character and begin the stand-up with them!'
  )
end

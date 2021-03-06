# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
profile = Profile.find_or_initialize_by(name: "h265")
profile.config = {
  video_codec: "libx265",
  "x264_vprofile": "high",
  "x264_preset": "slow",
  custom: %w(-map 0 -c:s mov_text -crf 20),
}
profile.transcoder_config = { input_options: {} }
profile.save!

profile = Profile.find_or_initialize_by(name: "H265 Intel Quick Sync")
profile.config = {
  video_codec: "hevc_qsv",
  "x264_preset": "slower",
  custom: %w(-map 0 -global_quality 22 -look_ahead 1),
}
profile.transcoder_config = { input_options: { hwaccel: "qsv" } }
profile.save!

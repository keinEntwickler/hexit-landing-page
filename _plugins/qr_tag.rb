require 'erb'
require 'rqrcode'

class QRCustom < Liquid::Tag
  RQRCODE_OPTIONS = {
    level: :l
  }.freeze
  RQRCODE_SVG_OPTIONS = {
    border_modules: 4,
    color: "black",
    fill: "white",
    svg_attributes: {
        class: "qr-code"
    },
    viewbox: true,
    use_path: true
  }.freeze

  def initialize(tag_name, text, tokens)
    super
    @text = text
  end

  def render(context)
    text = @text.strip
    resolved = text.split('.').inject(context) { |ctx, key| ctx[key] }
    resolved = text if resolved.nil? || resolved.is_a?(Liquid::Context)

    qr = RQRCode::QRCode.new(resolved, **RQRCODE_OPTIONS)

    qr.as_svg(**RQRCODE_SVG_OPTIONS).to_s
  end

  Liquid::Template.register_tag 'qr', self
end

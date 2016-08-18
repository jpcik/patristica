## Newthought tag will render anything in the tag with small caps
## Usage {% newthought Your text string here} will render a span
## YOUR TEXT STRING HERE (sort of, you know, small caps) if you are using the tufte.css file

module Jekyll
  class RenderSubcommentTag < Liquid::Tag

require "shellwords"

    def initialize(tag_name, text, tokens)
      super
      @text = text.shellsplit
    end


    def render(context)
      "<p class='subcomment'>~#{@text[0]}~</p> "
    end
  end
end

Liquid::Template.register_tag('subcomment', Jekyll::RenderSubcommentTag)
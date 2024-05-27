<template>
    <editor
        ref="CEditor"
        api-key="g7rkilellm263k5a8g175a0l54e9hpz1qva5vicdlvgjoi42"
        :init="{
            height: '70vh',
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor quickbars print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount pagebreak'
            ],
            menubar: 'file edit view insert format tools table help',
            toolbar:
                'undo redo | formatselect | bold italic underline forecolor backcolor | \
           alignleft aligncenter alignright alignjustify | table pagebreak  \
           bullist numlist outdent indent preview | removeformat | help',
            quickbars_selection_toolbar: 'bold italic underline | forecolor backcolor h2 h3 blockquote quickimage',
            skin: this.isDarkTheme ? 'oxide-dark' : 'oxide',
            content_css: this.isDarkTheme ? 'dark' : 'default',
            language: 'fr_FR',
            templates: [
                { title: 'Grid', description: 'Grid template', url: 'grid.html' },
            ]
        }"
        :value="data"
    />
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

export default {
    name: 'c-editor',
    props: { data: String },
    components: {
        editor: Editor
    }
};
</script>

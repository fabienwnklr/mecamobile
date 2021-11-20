<template>
    <editor
        ref="CEditor"
        api-key="u3ded68aeqsndhshanqxnsdu0v4ok0ii0mkphffsqi279gu5"
        :init="{
            height: 600,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor quickbars',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
                'undo redo | formatselect | bold italic underline forecolor backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent preview | removeformat | help',
            quickbars_selection_toolbar: 'bold italic underline | forecolor backcolor h2 h3 blockquote quickimage',
            skin: this.isDarkTheme ? 'oxide-dark' : 'oxide',
            content_css: this.isDarkTheme ? 'dark' : 'default'
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

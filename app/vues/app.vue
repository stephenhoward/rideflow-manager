<style lang="sass">
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    border: 0;
}
.hidden {
    display: none !important;
}
html {
    margin: 0;
    padding: 0;
}
* {
    box-sizing: border-box;
}
button {
    font-size: 10pt;
    padding: 4px 10px;
    background: white;
    -webkit-appearance: none;
    border: 1px solid #aaa;
    border-radius: 6px;
}
body {
    font-family: "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    height: 100%;
    min-height: 100%;
    div.login, div.forgot_password,div.password_reset_sent {
        padding: 20px 15px;
        max-width: 300px;
        border: 1px solid #ccc;
        border-radius: 4px;
        align-self: center;
        justify-self: center;
        display: grid;
        grid-columns-template: 1fr;
        grid-row-gap: 8px;
        h3 {
            margin: 0;
        }
        button {
            justify-self: center;
        }
        a {
            display: block;
            justify-self: right;
        }
        div.error {
            color: #f00;
            font-weight: 500;
        }
    }
    aside {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        & > * {
            order: 2;
        }
        span.la {
            font-size: 14pt;
        }
        div.nav {
            order: 0;
            width: 100%;
            button {
                color: #f70;
                font-size: 10pt;
                border: 0;
                background: none;
                padding: 3px 7px;
                & > * {
                    vertical-align: text-top;
                    margin-right: -8px;
                }
                &.back {
                    margin-left: -7px;
                }
            }
        }
        h2 {
            order: 1;
            font-weight: 500;
            font-size: 18pt;
            margin: 15px 0 5px 0;
        }
    }
    aside.model.editor {
        h2 {
            position: relative;
            font-size: 14pt;
            span.icon {
                position: absolute;
                top: 3px;
                left: 4px;
                pointer-events: none;
            }
            input {
                width: 100%;
                font-size: 12pt;
                padding-left: 24px;
            }
        }
    }
}

div.button-group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: center;
    button {
        font-size: 10pt;
    }
}
div.leaflet-marker-icon.stop-marker {
    width: 14px;
    height: 14px;
    border-radius:9px;
    background: white;
    border: 2px solid #555;
}

</style>

<template>
    <router-view></router-view>
</template>

<script>
    export default {
      name: 'app',
      data: () => {
        return {};
      }
    };
</script>
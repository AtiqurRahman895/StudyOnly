import DOMPurify from "dompurify";

const useReactQuill = (setRawQuillValue,setText,setWord_count) => {

    const customToolbar = [
        // [{ header: [ 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        // [{ color: ['#e8092e', '#ffffff', '#1e1e1e'] }],
        [{ list: "ordered" }, { list: "bullet" }],
        // [{ align: [] }], 
        // ["link"],
        ["clean"], 

      ];
    
    const modules = {
        toolbar: customToolbar,
    };

    let handleQuillChange = (value) => {
        setRawQuillValue(value);
    
        // Sanitize the content
        const sanitizedHtml = DOMPurify.sanitize(value, {
            KEEP_CONTENT: true,
            ALLOWED_ATTR: ['style'],
            ADD_ATTR: ['style'],
            FORBID_ATTR: [], 
            FORBID_TAGS: ['script', 'style'],
            ALLOWED_TAGS: ['p', 'b', 'br', 'strong', 'em', 'u', 's', 'ul', 'ol', 'li', 'span'],
            // ALLOWED_CSS: {
            //     properties: ['color'],
            //     allowedValues: {
            //         color: ['#e8092e', '#1e1e1e', '#ffffff'],
            //     },
            // },
            FORBID_CSS: {
                properties: ['position', 'z-index', 'display', 'visibility'],
            },
        });
    
        // Remove extra spaces (leading/trailing) from sanitized HTML
        const cleanedHtml = sanitizedHtml.trim();
    
        // Set the cleaned HTML to long description state
        setText(cleanedHtml);
    
        // Extract plain text using textContent
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cleanedHtml;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
        // Split by spaces and filter empty strings
        const words = plainText.trim().split(/\s+/).filter(Boolean);
        setWord_count(words.length);
    
        // console.log(words);
    };
    

    return {modules,handleQuillChange}
};

export default useReactQuill;
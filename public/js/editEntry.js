<div class="comment card">
  <div class="card-header">
    <h2>Edit Comment</h2>
  </div>
  <form id="edit-comment-form" class="card-body">
    <input type="hidden" name="comment-id" value="{{comment.id}}" />

    <label class="form-label" for="comment-author">Author</label>
    <input type="text" name="comment-author" value="{{comment.author}}" class="form-input" />

    <label class="form-label" for="comment-content">Content</label>
    <textarea name="comment-content" class="form-input">{{comment.content}}</textarea>

    <button type="submit" class="btn">Update</button>

    <button type="button" id="delete-comment-btn" class="btn">Delete</button>
  </form>
</div>

<script src="../public/js/editComment.js"></script>

package com.xhhao.commentinteract;

import com.xhhao.commentinteract.extension.Comment;
import com.xhhao.commentinteract.extension.Reply;
import org.springframework.stereotype.Component;
import run.halo.app.extension.SchemeManager;
import run.halo.app.extension.index.IndexSpec;
import run.halo.app.plugin.BasePlugin;
import run.halo.app.plugin.PluginContext;

import static run.halo.app.extension.index.IndexAttributeFactory.simpleAttribute;

/**
 * <p>Plugin main class to manage the lifecycle of the plugin.</p>
 * <p>This class must be public and have a public constructor.</p>
 * <p>Only one main class extending {@link BasePlugin} is allowed per plugin.</p>
 *
 * @author Handsome
 * @since 1.0.0
 */
@Component
public class CommentInteractPlugin extends BasePlugin {
    private final SchemeManager schemeManager;

    public CommentInteractPlugin(PluginContext pluginContext, SchemeManager schemeManager) {
        super(pluginContext);
        this.schemeManager = schemeManager;
    }

    @Override
    public void start() {
        schemeManager.register(Comment.class, indexSpecs -> {
            indexSpecs.add(new IndexSpec()
                .setName("spec.content")
                .setIndexFunc(simpleAttribute(
                    Comment.class, comment -> comment.getSpec().getContent())));
            indexSpecs.add(new IndexSpec()
                .setName("spec.raw")
                .setIndexFunc(simpleAttribute(
                    Comment.class, comment -> comment.getSpec().getRaw())));
            indexSpecs.add(new IndexSpec()
                .setName("spec.owner.displayName")
                .setIndexFunc(simpleAttribute(
                    Comment.class, comment -> comment.getSpec().getOwner().getDisplayName())));
            indexSpecs.add(new IndexSpec()
                .setName("spec.owner.name")
                .setIndexFunc(simpleAttribute(
                    Comment.class, comment -> comment.getSpec().getOwner().getName())));
        });

        schemeManager.register(Reply.class, indexSpecs -> {
            indexSpecs.add(new IndexSpec()
                .setName("spec.content")
                .setIndexFunc(simpleAttribute(
                    Reply.class, reply -> reply.getSpec().getContent())));
            indexSpecs.add(new IndexSpec()
                .setName("spec.raw")
                .setIndexFunc(simpleAttribute(
                    Reply.class, reply -> reply.getSpec().getRaw())));
            indexSpecs.add(new IndexSpec()
                .setName("spec.owner.displayName")
                .setIndexFunc(simpleAttribute(
                    Reply.class, reply -> reply.getSpec().getOwner().getDisplayName())));
            indexSpecs.add(new IndexSpec()
                .setName("spec.owner.name")
                .setIndexFunc(simpleAttribute(
                    Reply.class, reply -> reply.getSpec().getOwner().getName())));
        });
    }

    @Override
    public void stop() {
        System.out.println("插件停止！");
    }
}
